import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/api";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers) => {
      const clerk = window.Clerk;
      if (clerk) {
        const token = await clerk.session.getToken();
        // console.log(token);
        if (token) {
          // Autherized(Check if is Valide user)
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getEnergyGenerationRecordsBySolarUnit: build.query({
      // query: (id) => `/energy-generation-records/solar-unit/${id}`,
      query: ({ id, groupBy, limit }) =>
        `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
    }),
    getSolarUnitForUser: build.query({
      query: () => `/solar-units/me`,
    }),
    getSolarUnits: build.query({
      query: () => `/solar-units`,
    }),
    getSolarUnitById: build.query({
      query: (id) => `/solar-units/${id}`,
    }),

    createSolarUnit: build.mutation({
      query: (data) => ({
        url: `/solar-units`,
        method: "POST",
        body: data,
      }),
    }),
    editSolarUnit: build.mutation({
      query: ({ id, data }) => ({
        url: `/solar-units/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // User management lookup
    getAllUsers: build.query({
      query: () => `/users`,
    }),
    // External weather integration (Open-Meteo via backend proxy)
    getWeather: build.query({
      query: ({ lat, lng }) => `/weather?lat=${lat}&lng=${lng}`,
    }),
    // Analytical metrics, financial math, and solar technical stats
    getSolarAnalytics: build.query({
      query: (id) => `/analytics/${id}`,
    }),
    // Billing & Invoice endpoints
    getInvoices: build.query({
      query: ({ status } = {}) =>
        status ? `/invoices?status=${status}` : `/invoices`,
    }),
    getInvoiceById: build.query({
      query: (id) => `/invoices/${id}`,
    }),
    getSessionStatus: build.query({
      query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
    }),
    // Fetch invoice by Stripe session ID (used in complete page for PDF)
    getInvoiceBySessionId: build.query({
      query: (sessionId) => `/invoices/by-session/${sessionId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUsersQuery,
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetSolarUnitForUserQuery,
  useGetSolarUnitsQuery,
  useGetSolarUnitByIdQuery,
  useCreateSolarUnitMutation,
  useEditSolarUnitMutation,
  useGetWeatherQuery,
  useGetSolarAnalyticsQuery,
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useGetSessionStatusQuery,
  useGetInvoiceBySessionIdQuery,
} = api;
