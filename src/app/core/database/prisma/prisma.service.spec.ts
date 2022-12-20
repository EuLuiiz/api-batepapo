import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();
  });

  afterEach(async () => {
    await service.$disconnect();
  });

  it('testing the connection to the database', async () => {
    await service.onModuleInit();

    const users = await service.user.findMany();

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });
});
