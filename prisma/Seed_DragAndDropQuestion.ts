import { prisma } from "../src/database/prisma";

async function main() {
    await prisma.dragAndDropQuestion.create({
        data: {
          itemsOptions: [
            "0,75", "3/4", "75%", "1/2", "50%", "0,5"
          ],
          targets: [
            "Frações", "Decimais", "Porcentagens"
          ],
          correctPairs: [
            { item: "3/4", target: "Frações" },
            { item: "1/2", target: "Frações" },
            { item: "0,75", target: "Decimais" },
            { item: "0,5", target: "Decimais" },
            { item: "75%", target: "Porcentagens" },
            { item: "50%", target: "Porcentagens" }
          ],
          question: {
            connect: { id: 1 }
          }
        }
      });
      
}