import 'dotenv/config';
import { cleanEnv, url, str, bool } from 'envalid';

const CONFIG = cleanEnv(process.env, {

    HEADLESS: bool({
        default: false,
        desc: `run tests in headless mode`,
    }),

    USER_NAME: str({
        default: 'dummy@gmail.com',
        desc: 'user name for account to login',
    }),

    USER_PASSWORD: str({
        default: "user_password",
        desc: 'password for account to login',
    }),

    BASE_URL: url({
        desc: 'base url to run tests',
    })

});

export default CONFIG;