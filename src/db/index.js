import AWS from "aws-sdk";
import credentials from "../config/credentials";

AWS.config.update({
  credentials
});

export default AWS.DynamoDB();
