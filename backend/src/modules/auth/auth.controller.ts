import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { signToken } from "../../utils/jwt";

// Define expected request body types
interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await registerUser({ name, email, password });
    const userLogin = await loginUser({email,password})

    const loginToken = signToken({
      userId: userLogin.id,
      role: userLogin.role,
    });


    return res.status(201).json({
      message: "Registration successful. Verification Email Sent",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: loginToken
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Registration failed";

    return res.status(400).json({ message });
  }
};


export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    console.log("triggered")

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await loginUser({ email, password });

    const token = signToken({
      userId: user.id,
      role: user.role,
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid email or password";

    return res.status(401).json({ message });
  }
};
