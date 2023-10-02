import prisma from "./prisma"

export async function gets() {
    try {
        const users = await prisma.users.findMany()
        return {users}
    } catch (error) {
        return {error}
    }
}