"use client";

import { GraphQLClient } from "graphql-request";

import { useAuthStore } from "@/stores/auth";

export function createGraphqlClient() {
  const client = new GraphQLClient("/graphql");

  client.setHeader("content-type", "application/json");

  const token = useAuthStore.getState().accessToken;
  if (token) {
    client.setHeader("authorization", `Bearer ${token}`);
  }

  return client;
}

export async function authedFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = useAuthStore.getState().accessToken;
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshResponse = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!refreshResponse.ok) {
    useAuthStore.getState().clearAuth();
    return response;
  }

  const refreshed = (await refreshResponse.json()) as { accessToken: string; user: { id: string; email: string; nickname: string } };
  useAuthStore.getState().setAuth(refreshed.accessToken, refreshed.user);

  const retryHeaders = new Headers(init.headers);
  retryHeaders.set("authorization", `Bearer ${refreshed.accessToken}`);

  return fetch(input, {
    ...init,
    headers: retryHeaders,
    credentials: "include",
  });
}

