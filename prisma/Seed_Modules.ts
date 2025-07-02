import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const modulo = await prisma.module.create({
    data: {
      name: 'Matemática',
      description: 'Trilha completa de matemática para o ensino fundamental e médio.',
    },
  });

  const submodulos = [
    'Números e Representações',
    'Adição e Subtração',
    'Multiplicação, Divisão, Porcentagem e Razões',
    'Regra de Três e Escalas',
    'Expressões e Termos',
    'Equações e Inequações',
    'Sistemas Lineares',
    'Análise Combinatória',
    'Conceitos Básicos de Função',
    'Função Linear e Quadrática',
    'Função Exponencial e Logarítmica',
    'Geometria Plana',
    'Geometria Espacial',
    'Pontos Notáveis de um Triângulo',
    'Análise de Dados e Gráficos',
    'Medidas de Tendência Central',
    'Noções de Probabilidade',
    'Sequências e Padrões',
    'Lógica e Raciocínio',
    'Problemas Integrados',
    'Revisão Geral de Matemática',
  ];

  await Promise.all(
    submodulos.map((title, index) =>
      prisma.submodule.create({
        data: {
          title,
          description: `Conteúdo sobre ${title}`,
          order: index + 1,
          isReview: index === submodulos.length - 1,
          moduleId: modulo.id,
        },
      }),
    ),
  );

  console.log('Módulo de Matemática e submódulos inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
