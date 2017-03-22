const RandExp = require('randexp')

const proteinAlpha = 'ACDEFGHIKLMNPQRSTVWY'
const cyclinDockingMotif = new RandExp(/[RK][ACDEFGHIKLMNPQRSTVWY]L[ACDEFGHIKLMNPQRSTVWY][FYLIVMP]/)

function randomPeptide (len) {
  let pep = ''
  for (let i = 0; i < len; i += 1) {
    pep += proteinAlpha[Math.floor(Math.random() * proteinAlpha.length)]
  }
  return pep
}

const n = 20
for (let i = 0; i < n; i += 1) {
  if (i === 7 || i === 12) {
    const peptide = randomPeptide(Math.floor(Math.random() * 20))
    console.log(`>sequence ${i}\n${peptide}`)
    continue
  }

  const peptide = cyclinDockingMotif.gen()
  const prefix = randomPeptide(Math.floor(Math.random() * 10))
  const suffix = randomPeptide(Math.floor(Math.random() * 10))
  console.log(`>sequence ${i}\n${prefix}${peptide}${suffix}`)
}
