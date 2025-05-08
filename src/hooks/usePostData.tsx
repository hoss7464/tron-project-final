import { useState } from "react";


type UsePostDataReturn<T> = {
  postData: (payload: T) => void;
  data: any;
  isLoading: boolean;
  error: string | null;
};

function usePostData<T extends Record<string, any>>(url: string): UsePostDataReturn<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const postData = (payload: T) => {
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch existing posts!");
        }
        return res.json();
      })
      .then((posts: { id: string }[]) => {
        const nextId =
          posts.length > 0
            ? (Math.max(...posts.map((post) => Number(post.id))) + 1).toString()
            : "1";

        const newPayload = { ...payload, id: nextId };

        return fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPayload),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post data!");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err: any) => {
        setError(err.message || "Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { postData, data, isLoading, error };
}

export default usePostData;
