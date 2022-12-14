const User = require("../../models/user");
const { OAuth2Client } = require("google-auth-library");
const { httpStatus500, httpStatus200 } = require("../../utils/httpResponse");

const Crypto = require("crypto");

const jwt = require("jsonwebtoken");

const {
  JWT_SECRET_KEY,
  REFRESH_TOKEN_EXPIRY,
} = require("../../utils/constants");
const { GOOGLE_CLIENT_ID } = require("../../utils/constants");

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const login = async (req, res) => {
  try {
    if (req.body.token) {
      const token = req.body.token;

      const resp = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });

      const randBytes = Crypto.randomBytes(32).toString("hex");

      const refreshToken = jwt.sign({ token: randBytes }, JWT_SECRET_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      });

      if (resp.payload.email) {
        const user = await User.findOne({ email: resp.payload.email });

        if (user) {
          user.generateToken(async (err, token) => {
            if (err) {
              return res.status(500).json(httpStatus500());
            } else {
              user.refreshToken = randBytes;
              await user.save();
              return res
                .status(200)
                .json(
                  httpStatus200(
                    { refreshToken: refreshToken, accessToken: token },
                    "User Logged In"
                  )
                );
            }
          }, user);
        } else {
          const user = new User({
            email: resp.payload.email,
            name: resp.payload.name,
            refreshToken: refreshToken,
            photoUrl: resp.payload.picture,
          });

          await user.save();

          user.generateToken((err, token) => {
            if (err) {
              return res.status(500).json(httpStatus500());
            } else {
              return res
                .status(200)
                .json(
                  httpStatus200(
                    { refreshToken: refreshToken, accessToken: token },
                    "User Created."
                  )
                );
            }
          }, user);
        }
      } else {
        return res
          .status(401)
          .json({ message: "Invalid Token", success: false });
      }
    } else {
      return res.status(401).json({ message: "Token Missing", success: false });
    }
  } catch (err) {
    return res.status(500).json(httpStatus500());
  }
};

module.exports = login;
