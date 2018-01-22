import AWS from "aws-sdk";
import credentials from "../../config/dbCredentials";

export default (() => {
  AWS.config.update({
    credentials,
    endpoint: "http://localhost:8000"
  });
  return AWS;
})();
