const fs = require("fs");
const crypto = require("crypto");

const sequenceSize = 32;

const randomSequence = crypto.randomBytes(sequenceSize);

const base64Sequence = randomSequence.toString("base64");

const envLocalContent = `GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=${base64Sequence}
NEXTAUTH_URL=http://localhost:3000
`;

fs.writeFileSync(".env.local", envLocalContent);

console.log("A '.env.local' file was created in your project root with the following content:");
console.log(envLocalContent);
console.log("Please fill in the environment variables with the correct values.");
