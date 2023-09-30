import { withSessionRoute } from "src/lib/utils/session";
import {
  decodeSAMLResponse,
  validateSAMLResponse,
} from "../../../../../server/actions/sso";

// TODO determine how Salesforce will fetch this
// @route   GET/POST api/user/sso/callback
// @desc    URL to provide to the IdP
// @access  Public
const handler = async (req, res) => {
  const {
    query: { SAMLResponse: encodedSAMLResp },
  } = req;

  console.log(encodedSAMLResp);

  let success, error;
  try {
    const decodedSAMLResp = decodeSAMLResponse(encodedSAMLResp);
    success = validateSAMLResponse(decodedSAMLResp);
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
