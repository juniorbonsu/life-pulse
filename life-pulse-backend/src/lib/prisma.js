const {PrismaClient} = require('@prisma/client'); //establishes the prisma dependency
const prisma = new PrismaClient();
module.exports = prisma;