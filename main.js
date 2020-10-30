const dnaBases = ['A', 'T', 'C', 'G']
// Returns a random DNA base
const returnRandBase = () => {
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
        for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    }
return newStrand
}
  
const pAeqorFactory = (num, arr) => {
    return {
        specimenNum: num, 
        dna: arr,

        mutate() {
            const indexToChange = Math.floor(Math.random() * 15);
            const baseToChange = this.dna[indexToChange];
            const newBases = dnaBases.filter(base => base !== baseToChange);
            this.dna[indexToChange] = newBases[Math.floor(Math.random() * 3)];
        },

        complementStrand() {
            this.compStrand = [];
            for (let i = 0; i < 15; i++) {
                switch(this.dna[i]) {
                    case 'A':
                        this.compStrand[i] = 'T';
                        break;
                    case 'T':
                        this.compStrand[i] = 'A';
                        break;
                    case 'C':
                        this.compStrand[i] = 'G';
                        break;
                    case 'G':
                        this.compStrand[i] = 'C';
                }
            }
            console.log(this.compStrand);
        },

        compareDNA(other) {
            let matches = 0;
            for (let i = 0; i < 15; i++) {
                if (this.dna[i] === other.dna[i]) {
                    matches++;
                }
            }
            const percentage = Math.round((matches / 15) * 100);
            console.log(`Specimen #1 and Specimen #2 have ${percentage}% DNA in common.`);
        },

        willLikelySurvive() {
            let survival = 0;
            for (let i = 0; i < 15; i++) {
                if (this.dna[i] === 'C' || this.dna[i] === 'G') {
                    survival++;
                }
            }
            return (survival >= 9);
        }
    }
};

let testGroup = [];
let number = 1;

while (testGroup.length <= 30) {
    number++;
    let newSpecimen = pAeqorFactory(number, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
        testGroup.push(newSpecimen);
    }
}

console.log(testGroup[0].dna);
testGroup[0].complementStrand();