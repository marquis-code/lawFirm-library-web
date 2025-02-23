import { GATEWAY_ENDPOINT } from "../axios.config";

export const settings_api = {
      $_fetch_terms_of_use: () => {
        const url = '/policies?app=tenant-app&type=terms_of_use';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_privacy_policy: () => {
        const url = '/policies?app=tenant-app&type=privacy_policy';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_agent_terms_of_use: () => {
        const url = '/policies?app=agent-app&type=terms_of_use';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_service_provider_terms_of_use: () => {
        const url = '/policies?app=service-provider-app&type=terms_of_use';
        return GATEWAY_ENDPOINT.get(url);
      },
};
