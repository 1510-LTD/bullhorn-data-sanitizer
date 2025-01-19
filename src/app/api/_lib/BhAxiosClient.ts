import axios from "axios";
import { logger } from "../_components/libraries/logger";
import { ForbiddenError } from "../_components/libraries/errors";

const username = process.env.BULLHORN_API_USERNAME;
const password = process.env.BULLHORN_API_PASSWORD;

const BH_BASE_URL = process.env.BULLHORN_BASE_URL;

let cachedBhRestToken: string | null = null;

async function getBhRestToken() {
  try {
    const { data }: any = await axios.get(
      `https://ukuniversal.bullhornstaffing.com/universal-login/session/login?username=${username}&password=${password}`
    );

    const { sessions } = data;
    const accessToken = sessions?.filter(
      (session: { name: string }) => session.name === "rest"
    )[0].value?.token;

    return accessToken;
  } catch (error) {
    logger.error(error, "Error fetching BhRestToken:");
    throw new Error("Error fetching BhRestToken");
  }
}

export const getBullhornAxiosClient = async () => {
  if (!cachedBhRestToken) {
    cachedBhRestToken = await getBhRestToken();
    if (!cachedBhRestToken) throw new ForbiddenError("Missing BHRestToken");
  }

  const client = axios.create({
    baseURL: `${BH_BASE_URL}`,
    headers: {
      BHRestToken: `${cachedBhRestToken}`
    }
  });

  // Add a request interceptor
  client.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      if (error.response?.status === 401) {
        cachedBhRestToken = await getBhRestToken();
        if (!cachedBhRestToken)
          // Update the request with the new token
          error.config.headers["BHRestToken"] = cachedBhRestToken;
        return axios.request(error.config);
      }
      return Promise.reject(error);
    }
  );

  return client;
};
