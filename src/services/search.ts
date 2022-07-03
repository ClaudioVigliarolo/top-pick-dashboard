import axios, { AxiosResponse } from "axios";

import { HOSTNAME } from "../config/config";
import {
  SearchKeyword,
  SearchKeywordCreated,
  SearchResultArticle,
  SearchResultCreated,
  SearchResultVideo,
} from "@toppick/common";

export const getSearchKeywords = async (
  token: string,
  topic_id: number,
  search_type: string,
  include_inactive: boolean
): Promise<SearchKeyword[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/keywords`, {
    params: {
      topic_id,
      search_type,
      include_inactive,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const createSearchKeyword = async (
  token: string,
  keyword: SearchKeywordCreated
): Promise<SearchKeyword> => {
  const response = await axios.post(
    `${HOSTNAME}/api/search/keywords`,
    {
      keyword,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const updateSearchKeyword = async (
  token: string,
  id: number,
  keyword: SearchKeywordCreated
): Promise<SearchKeyword> => {
  const response = await axios.patch(
    `${HOSTNAME}/api/search/keywords/${id}`,
    {
      keyword,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const deleteSearchKeyword = async (
  token: string,
  keywordId: number
): Promise<SearchKeyword[]> => {
  const response = await axios.delete(
    `${HOSTNAME}/api/search/keywords/${keywordId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const getSearchResultsArticle = async (
  token: string,
  keyword_id: number,
  limit: number,
  skip: number
): Promise<SearchResultArticle[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/results/articles`, {
    params: {
      keyword_id,
      limit,
      skip,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const getSearchResultsVideo = async (
  token: string,
  keyword_id: number,
  limit: number,
  skip: number
): Promise<SearchResultVideo[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/results/videos`, {
    params: {
      keyword_id,
      limit,
      skip,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const getSearchResultsImage = async (
  token: string,
  keyword_id: number,
  limit: number,
  skip: number
): Promise<SearchResultVideo[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/results/images`, {
    params: {
      keyword_id,
      limit,
      skip,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const updateSearchResultsArticle = async (
  token: string,
  keyword_id: number,
  results: SearchResultCreated[]
): Promise<SearchKeyword[]> => {
  const response = await axios.put(
    `${HOSTNAME}/api/search/results/articles/${keyword_id}`,
    {
      results,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const updateSearchResultsVideo = async (
  token: string,
  keyword_id: number,
  results: SearchResultCreated[]
): Promise<SearchKeyword[]> => {
  const response = await axios.put(
    `${HOSTNAME}/api/search/results/videos/${keyword_id}`,
    {
      results,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const updateSearchResultsImage = async (
  token: string,
  keyword_id: number,
  results: SearchResultCreated[]
): Promise<SearchKeyword[]> => {
  const response = await axios.put(
    `${HOSTNAME}/api/search/results/images/${keyword_id}`,
    {
      results,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const sortSearchKeywords = async (
  token: string,
  keywords: { id: number; index: number }[]
): Promise<AxiosResponse> => {
  return await axios.patch(
    `${HOSTNAME}/api/search/keywords/sort`,
    {
      keywords,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
