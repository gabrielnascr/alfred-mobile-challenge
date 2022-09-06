import api from "./api";

const coreRestApi = {
  getPatients:  async ({ results = 50, page = 1, }) => {
    const { data } = await api.get(`?page=${page}&results=${results}&nat=BR`);

    return data;
  },
}

export default coreRestApi;
