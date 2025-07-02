import { PrismaClient, TypeQuestion, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const submodules = await prisma.submodule.findMany({
    where: {
      module: {
        name: 'Matemática',
      },
    },
  });

  if (!submodules.length) {
    throw new Error('Nenhum submódulo de Matemática encontrado.');
  }

  const contentTypes: TypeQuestion[] = [
    'dragAndDropAssociation',
    'dragAndDropFill',
    'dragAndDropOrder',
    'multipleChoice',
    'award',
    'performance',
  ];

  for (const submodule of submodules) {
    for (const type of contentTypes) {
      // Cria o item
      const item = await prisma.item.create({
        data: {
          type,
          submoduleId: submodule.id,
        },
      });

      // Cria 5 questões por item
      const questions = Array.from({ length: 5 }).map(() => ({
        itemId: item.id,
        type,
        difficulty: 'medium' as Difficulty,
        pointsMax: 100,
      }));

      await prisma.question.createMany({
        data: questions,
      });
    }
  }

  console.log('Items e Questions inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
