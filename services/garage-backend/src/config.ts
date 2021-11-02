const config = { db: process.env.MONGODB_URL };
Object.freeze(config);

export default config as Readonly<typeof config>;
