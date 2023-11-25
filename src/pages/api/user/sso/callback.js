import { withSessionRoute } from "src/lib/utils/session";
import {
  decodeSAMLResponse,
  validateSAMLResponse,
} from "../../../../../server/actions/sso";
import { getUserFromSalesforceUserId } from "../../../../../server/mongodb/actions/User";

const SALESFORCE_CERTIFICATE = process.env["SALESFORCE_CERTIFICATE"];
if (!SALESFORCE_CERTIFICATE && process.env["NODE_ENV"] === "production")
  throw new Error("SALESFORCE_CERTIFICATE env var must be set");

// TODO determine how Salesforce will fetch this
// @route   GET/POST api/user/sso/callback
// @desc    URL to provide to the IdP
// @access  Public
const handler = async (req, res) => {
  const { SAMLResponse: encodedSAMLResp } = req.body;
  let result;
  let val = Buffer.from(encodedSAMLResp, 'utf-8');
  try {
    const decodedSAMLResp = decodeSAMLResponse(val);
    result = validateSAMLResponse(decodedSAMLResp, SALESFORCE_CERTIFICATE);
  } catch (e) {
    console.error(e);
    result = { error: "Error processing SAML response" };
  }

  if (result.error) {
    return res.status(500).json({
      success: false,
      message: `${result.error}: Contact an administrator`,
    });
  }

  const user = await getUserFromSalesforceUserId(result.userId, result.permissionLevel, result.username);
  if (!user)
    return res.status(404).json({
      success: result.permissionLevel,
      message: "A Southface user has not been provisioned for this user yet",
    });

  req.session.user = {
    ...user,
    isLoggedIn: true,
  };
  await req.session.save();

  return res.redirect(302, "/library");
};

export default withSessionRoute(handler);
