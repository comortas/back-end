const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const credential = new DefaultAzureCredential();
const keyVaultUrl = process.env.KEY_VAULT_URI;

var GetSecret = async (secretName) => {
    try {
        const client = new SecretClient(keyVaultUrl, credential);
        const secret = await client.getSecret(secretName);
        return secret.value;
    } catch (err) {
        throw err;
    }
}

exports.GetSecret = GetSecret;