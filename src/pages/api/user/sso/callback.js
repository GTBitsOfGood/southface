import { withSessionRoute } from "src/lib/utils/session";
import {
  decodeSAMLResponse,
  validateSAMLResponse,
} from "../../../../../server/actions/sso";

const SALESFORCE_CERTIFICATE = process.env["SALESFORCE_CERTIFICATE"];
if (!SALESFORCE_CERTIFICATE && process.env["NODE_ENV"] === "production")
  throw new Error("SALESFORCE_CERTIFICATE env var must be set");

// TODO determine how Salesforce will fetch this
// @route   GET/POST api/user/sso/callback
// @desc    URL to provide to the IdP
// @access  Public
const handler = async (req, res) => {
  const { SAMLResponse: encodedSAMLResp } = req.body;

  let success, error;
  try {
    const decodedSAMLResp = decodeSAMLResponse(encodedSAMLResp);
    success = validateSAMLResponse(decodedSAMLResp, SALESFORCE_CERTIFICATE);
  } catch (e) {
    console.error("Error processing SAML response");
    console.error(e);
    error = e;
  }

  if (success) {
    // TODO check SAML response to determine user
    const user = {
      id: "",
    };
    req.session.user = {
      ...user,
      isLoggedIn: true,
    };
    await req.session.save();

    return res.redirect("/library");
  } else if (error) {
    return res.status(500).json({
      success: false,
      message: "Internal error: contact an administrator",
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "Failed to authenticate user",
    });
  }
};

export default withSessionRoute(handler);
