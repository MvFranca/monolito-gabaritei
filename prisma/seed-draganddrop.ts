import { PrismaClient, Difficulty, TypeQuestion } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const submodule = await prisma.submodule.findFirst({
    where: { title: 'Números e Representações' },
    include: { items: true },
  });

  if (!submodule) {
    throw new Error('Submódulo "Números e Representações" não encontrado.');
  }

  // Encontra um item do tipo dragAndDropAssociation
  const dragItem = submodule.items.find(
    item => item.type === 'dragAndDropAssociation'
  );

  if (!dragItem) {
    throw new Error('Nenhum item do tipo dragAndDropAssociation encontrado no submódulo.');
  }

  for (let i = 1; i <= 5; i++) {
    const question = await prisma.question.create({
      data: {
        itemId: dragItem.id,
        type: TypeQuestion.dragAndDropAssociation,
        pointsMax: 100,
        difficulty: Difficulty.medium,
        dragAndDropQuestion: {
            create: {
              itemsOptions: [
                `Item A${i}`,
                `Item B${i}`,
                `Item C${i}`,
              ],
              targets: [
                `Destino 1`,
                `Destino 2`,
                `Destino 3`,
              ],
              correctPairs: [
                { option: `Item A${i}`, target: 'Destino 2' },
                { option: `Item B${i}`, target: 'Destino 3' },
                { option: `Item C${i}`, target: 'Destino 1' },
              ],
            },
          },          
      },
    });

    console.log(`Questão Drag and Drop ${i} criada com ID: ${question.id}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
