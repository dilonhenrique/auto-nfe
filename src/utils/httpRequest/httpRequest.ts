/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface HttpRequestOptions extends RequestInit {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
}

type HttpSuccess<T> = {
  success: true;
  data: T;
  error?: never;
};

type HttpError = {
  success: false;
  data?: never;
  error: {
    status: number;
    statusText: string;
    data?: any;
  };
};

export type HttpResponse<T> = HttpSuccess<T> | HttpError;

export async function httpRequest<T = any>(
  url: string,
  options: HttpRequestOptions = {}
): Promise<HttpResponse<T>> {
  const { method = "GET", headers = {}, body, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorData = isJson ? await response.json() : await response.text();
      return {
        success: false,
        error: {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        },
      };
    }

    const data = isJson ? await response.json() : await response.text();
    return {
      success: true,
      data: data as T,
    };
  } catch (err: any) {
    return {
      success: false,
      error: {
        status: 0,
        statusText: "Network or parsing error",
        data: err?.message || err,
      },
    };
  }
}
