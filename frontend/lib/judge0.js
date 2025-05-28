export const compilewithjudge0 = async (
  source_code,
  language_id,
  stdin = ""
) => {
  try {
    const res = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": process.env.JUDGE0_API_KEY,
        },
        body: JSON.stringify({
          language_id,
          source_code,
          stdin,
        }),
      }
    );

    const data = await res.json();
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error Sending code from Judge0 Helper", error);
  }
};
