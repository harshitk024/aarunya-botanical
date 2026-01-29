import axios from "axios"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"

// Create cookie jar
const jar = new CookieJar()

// Wrap axios
const client = wrapper(axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  jar, // ⭐ THIS IS THE KEY
}))

// Login (cookie will be stored in jar)
await client.post("/api/auth/login", {
  email: "kharshit020@gmail.com",
  password: "abcdef",
})

console.log("User Login successful")

// Concurrency test
const requests = Array.from({ length: 10 }).map(() =>
  client
    .post("/api/appointments/36220f2d-a92e-4c9d-9cd3-751233e91209/book", {
      startTime: "2026-01-27T07:00:00.000Z",
      endTime: "2026-01-27T07:30:00.000Z",
    })
    .then(r => ({
      status: r.status,
      ok: true,
    }))
    .catch(e => ({
      status: e.response?.status,
      ok: false,
      error: e.response?.data,
    }))
)

const results = await Promise.all(requests)
console.table(results)
