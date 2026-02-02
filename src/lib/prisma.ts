import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
    var pool: Pool | undefined;
}

const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL environment variable is not set");
    }

    // Reuse pool in development
    if (!global.pool) {
        global.pool = new Pool({ connectionString });
    }

    const adapter = new PrismaPg(global.pool);

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
};

export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;
