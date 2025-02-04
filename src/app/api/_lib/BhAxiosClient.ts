import axios from "axios";
import { logger } from "../_components/libraries/logger";
import { ForbiddenError } from "../_components/libraries/errors";
import { getSession } from "@auth0/nextjs-auth0";

let BH_BASE_URL = "https://rest20.bullhornstaffing.com/rest-services/";

let cachedBhRestToken: string | null = null;

async function getBhRestToken() {
  try {
    const session = await getSession();

    const { BULLHORN_API_USERNAME, BULLHORN_API_PASSWORD } =
      session?.user?.user_metadata;

    if (!BULLHORN_API_USERNAME || !BULLHORN_API_PASSWORD) {
      throw new ForbiddenError("Missing Bullhorn API credentials");
    }

    const { data }: any = await axios.get(
      `https://ukuniversal.bullhornstaffing.com/universal-login/session/login?username=${BULLHORN_API_USERNAME}&password=${BULLHORN_API_PASSWORD}`
    );

    const { sessions } = data;
    const restSession = sessions?.filter(
      (session: { name: string }) => session.name === "rest"
    )[0].value;

    BH_BASE_URL = restSession.endpoint;

    return restSession.token;
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
