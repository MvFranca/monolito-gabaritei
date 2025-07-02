import { prisma } from "../src/database/prisma";

async function seed() {
    const subjects = [
      { name: "Física", options: ["Cinemática", "Dinâmica", "Energia", "Eletricidade", "Ondas", "Termodinâmica", "Óptica"] },
      { name: "Química", options: ["Ligações Químicas", "Reações Químicas", "Química Orgânica", "Soluções", "Eletroquímica"] },
      { name: "Biologia", options: ["Citologia", "Genética", "Ecologia", "Evolução", "Fisiologia Humana", "Biotecnologia"] },
      { name: "Língua Portuguesa", options: ["Interpretação de Texto", "Tipos Textuais", "Figuras de Linguagem", "Funções da Linguagem"] },
      { name: "Literatura", options: ["Escolas Literárias", "Modernismo", "Romantismo", "Classicismo"] },
      { name: "História", options: ["Brasil Colônia", "Ditadura Militar", "Revolução Industrial", "Primeira e Segunda Guerra Mundial"] },
      { name: "Geografia", options: ["Geopolítica", "Climatologia", "Globalização", "Agricultura"] },
      { name: "Filosofia", options: ["Existencialismo", "Filosofia Moderna", "Ética e Moral"] },
      { name: "Sociologia", options: ["Cultura", "Movimentos Sociais", "Cidadania"] },
    ];
  
    for (const subject of subjects) {
      await prisma.moduleMatterContent.create({
        data: {
          name: subject.name,
          options: subject.options,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }
  
    console.log("Seed concluído com sucesso!");
  }
  
  seed()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
  