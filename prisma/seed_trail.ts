import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function defaultButtons() {
  return [
    { type: 'DragAndDropQuestion', quantity: '3', position: '1' },
    { type: 'MultipleChoiceQuestion', quantity: '4', position: '2' },
    { type: 'UserQuestionAnswer', quantity: '2', position: '3' },
    { type: 'Award', position: '4' },
    { type: 'Performance', position: '5' },
  ];
}

async function main() {

//   await prisma.userContentProgress.deleteMany();
//   await prisma.eloUser.deleteMany();
//   await prisma.content.deleteMany();
//   await prisma.submodule.deleteMany();
//   await prisma.module.deleteMany();


  // Módulos
  const matematica = await prisma.module.create({
    data: {
      name: 'Matemática',
      description: 'Aprenda conteúdos fundamentais de matemática.',
    },
  });

  const linguagens = await prisma.module.create({
    data: {
      name: 'Linguagens',
      description: 'Estude interpretação de texto e gramática.',
    },
  });

  // Submódulos de Matemática
  const operacoesBasicas = await prisma.submodule.create({
    data: {
      title: 'Operações Básicas',
      description: 'Aprenda adição, subtração, multiplicação e divisão.',
      moduleId: matematica.id,
    },
  });

  const expressoesTermos = await prisma.submodule.create({
    data: {
      title: 'Expressões e Termos',
      description: 'Entenda expressões numéricas e termos semelhantes.',
      moduleId: matematica.id,
    },
  });

  // Submódulos de Linguagens
  const interpretacaoTexto = await prisma.submodule.create({
    data: {
      title: 'Interpretação de Texto',
      description: 'Desenvolva habilidades de leitura e interpretação.',
      moduleId: linguagens.id,
    },
  });

  const gramaticaFundamental = await prisma.submodule.create({
    data: {
      title: 'Gramática Fundamental',
        description: 'Estude os fundamentos da gramática.',
      moduleId: linguagens.id,
    },
  });

  // Conteúdos - Operações Básicas
  await prisma.content.createMany({
    data: [
      {
        name: 'Adição',
        description: 'Aprenda a somar números naturais.',
        submoduleId: operacoesBasicas.id,
        moduleId: matematica.id,
        position: 1,
        weight: 100,
        buttons: defaultButtons(),
      },
      {
        name: 'Subtração',
        description: 'Aprenda a subtrair números naturais.',
        submoduleId: operacoesBasicas.id,
        moduleId: matematica.id,
        position: 2,
        weight: 100,
        buttons: defaultButtons(),
      },
    ],
  });

  // Conteúdos - Expressões e Termos
  await prisma.content.createMany({
    data: [
      {
        name: 'Expressões Numéricas',
        description: 'Como resolver expressões com múltiplas operações.',
        submoduleId: expressoesTermos.id,
        moduleId: matematica.id,
        position: 1,
        weight: 120,
        buttons: defaultButtons(),
      },
      {
        name: 'Termos Semelhantes',
        description: 'Identifique e simplifique termos semelhantes.',
        submoduleId: expressoesTermos.id,
        moduleId: matematica.id,
        position: 2,
        weight: 120,
        buttons: defaultButtons(),
      },
    ],
  });

  // Conteúdos - Interpretação de Texto
  await prisma.content.createMany({
    data: [
      {
        name: 'Leitura e Compreensão',
        description: 'Dicas e práticas de leitura atenta.',
        submoduleId: interpretacaoTexto.id,
        moduleId: linguagens.id,
        position: 1,
        weight: 110,
        buttons: defaultButtons(),
      },
      {
        name: 'Ideias Principais',
        description: 'Como identificar a ideia principal de um parágrafo.',
        submoduleId: interpretacaoTexto.id,
        moduleId: linguagens.id,
        position: 2,
        weight: 110,
        buttons: defaultButtons(),
      },
    ],
  });

  // Conteúdos - Gramática Fundamental
  await prisma.content.createMany({
    data: [
      {
        name: 'Verbos',
        description: 'Conjugação e uso correto dos verbos.',
        submoduleId: gramaticaFundamental.id,
        moduleId: linguagens.id,
        position: 1,
        weight: 130,
        buttons: defaultButtons(),
      },
      {
        name: 'Pronomes',
        description: 'Tipos e usos dos pronomes.',
        submoduleId: gramaticaFundamental.id,
        moduleId: linguagens.id,
        position: 2,
        weight: 130,
        buttons: defaultButtons(),
      },
    ],
  });

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
