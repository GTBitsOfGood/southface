import { JSDOM } from "jsdom";

// No great options for XML parsing that exposed required attributes,
// so pulling in JSDOM just to use the DOMParser.
const dom = new JSDOM("");
const DOMParser = dom.window.DOMParser;

const SUCCESS_VALUE = "urn:oasis:names:tc:SAML:2.0:status:Success";

/**
 * Decodes an encoded SAML response.
 *
 * @param {String} encodedSAMLResp Base64-encoded SAML response
 */
export function decodeSAMLResponse(encodedSAMLResp) {
  // Base64-decode
  const samlResp = Buffer.from(encodedSAMLResp, "base64").toString("utf-8");

  return samlResp;
}

/**
 * Validate the success of a SAML response.
 * TODO determine if there are other indicators of success/failure
 *
 * @param {String} samlResp decoded SAML response (XML)
 * @returns {Boolean} true if successful
 */
export function validateSAMLResponse(samlResp, certificate) {
  const xml = new DOMParser().parseFromString(samlResp, "text/xml");

  const certificateElement = xml.getElementsByTagName("ds:X509Certificate")[0];
  const certificateStr = certificateElement.textContent.replace(/\s/g, "");

  const statusElement = xml.getElementsByTagName("saml2p:StatusCode")[0];
  const statusStr = statusElement.getAttribute("Value");

  return certificateStr === certificate && statusStr === SUCCESS_VALUE;
}
