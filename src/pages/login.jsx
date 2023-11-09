import { Box } from "@chakra-ui/react";
import { deflateRawSync } from "zlib";
import LoginComponent from "../components/Login/LoginComponent";
import WrapperBox from "../components/Login/WrapperBox";

const LoginPage = ({ ssoUrl }) => {
  return (
    <Box height={{ base: "45em", "2xl": "50em" }}>
      <WrapperBox>
        <LoginComponent ssoUrl={ssoUrl} />
      </WrapperBox>
    </Box>
  );
};

export async function getStaticProps() {
  return {
    props: {
      // ssoUrl: `https://southface.my.salesforce.com/idp/endpoint/HttpRedirect?SAMLRequest=${generateEncodedRequest()}`,
      ssoUrl: `https://southface.my.site.com/earthcraftcommunity/idp/endpoint/HttpRedirect?SAMLRequest=${generateEncodedRequest()}`,
    },
  };
}

function generateEncodedRequest() {
  const request = `
    <samlp:AuthnRequest
      xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
      ID="https://southface.netlify.app"
      Version="2.0"
      IssueInstant="${new Date().toISOString()}"
    >
      <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">
        https://southface.netlify.app
      </saml:Issuer>
      <samlp:NameIDPolicy
        Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
        AllowCreate="true"
      />
    </samlp:AuthnRequest>
  `.trim();

  const deflated = deflateRawSync(request);
  const b64Encoded = Buffer.from(deflated).toString("base64");
  const uriEncoded = encodeURIComponent(b64Encoded);

  return uriEncoded;
}

export default LoginPage;
