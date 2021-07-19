import d from"./default-styles.json.proxy.js";import f from"./default-decorators.json.proxy.js";export function createMappingFunction(e){return t=>[...t].map(r=>e.get(r)??e.get(r.toLowerCase())??r).join("")}export function decorateNonCombiningMark(e,t){return/\p{Mark}/giu.test(e)?e:`${e}${t}`}export function encloseNonCombiningMark(e,t,r){return/\p{Mark}/giu.test(e)?e:`${t}${e}${r}`}export function createTransformationFunction(e){return t=>[...t].map(e).join("")}const s={...Object.entries(f).reduce((e,[t,r])=>(e[t]=r,e),{}),"Next Year":{left:(new Date().getFullYear()+1).toString(),right:(new Date().getFullYear()+1).toString()},"Current Year":{left:new Date().getFullYear().toString(),right:new Date().getFullYear().toString()}},a={...Object.entries(d).reduce((e,[t,r])=>(e[t]=createMappingFunction(new Map(r)),e),{}),Parens:createTransformationFunction(e=>encloseNonCombiningMark(e,"〖","〗")),Wavy:createTransformationFunction(e=>encloseNonCombiningMark(e,"〰","〰")),Brackets:createTransformationFunction(e=>encloseNonCombiningMark(e,"〔","〕")),"Angle Brackets":createTransformationFunction(e=>encloseNonCombiningMark(e,"《","》")),Enclosed:createTransformationFunction(e=>encloseNonCombiningMark(e,"『","』")),"Semi Enclosed":createTransformationFunction(e=>encloseNonCombiningMark(e,"【","】")),"Double Lined":createTransformationFunction(e=>decorateNonCombiningMark(e,"̲̅")),Hearts:createTransformationFunction(e=>decorateNonCombiningMark(e,"♥")),Striked:createTransformationFunction(e=>decorateNonCombiningMark(e,"̶")),Deleted:createTransformationFunction(e=>decorateNonCombiningMark(e,"̸")),"Camel Case":createTransformationFunction((e,t)=>t%2==0?e.toUpperCase():e.toLowerCase()),Inverted:e=>[...e].reverse().join(""),Matrix:createTransformationFunction(e=>{const t=7,o=["̿","͇","͇̿","̅","̲","̲̅","̶","͇"][Math.floor(Math.random()*t)];return decorateNonCombiningMark(e,o)}),"Double Letters":createTransformationFunction(e=>decorateNonCombiningMark(e,e)),"Double Some Letters":createTransformationFunction(e=>{const t=2,r=Math.floor(Math.random()*t);return decorateNonCombiningMark(e,e.repeat(r))}),"New Year":e=>{const t=a["Lower Numbers"](s["Current Year"].left),r=a["Upper Numbers"](s["Next Year"].right);return`~${t}~ ${e} ~${r}~`}};export class TextDecorator{constructor(t=a,r=s){this.#t=new Map,this.#e=new Map,this.addStyle=(o,n)=>this.#t.set(o,n),this.removeStyle=o=>this.#t.delete(o),this.listStyles=()=>[...this.#t.keys()],this.addDecorator=(o,n)=>this.#e.set(o,n),this.removeDecorator=o=>this.#e.delete(o),this.listDecorators=()=>[...this.#e.keys()];for(const[o,n]of Object.entries(t))this.addStyle(o,n);for(const[o,n]of Object.entries(r))this.addDecorator(o,n)}#t;#e;decorateText(t,r="leet",o={}){const n={leftDecorator:"",rightDecorator:"",...o},l=this.#e.get(n.leftDecorator)?.left??"",c=this.#e.get(n.rightDecorator)?.right??"",i=t.normalize("NFD"),u=(this.#t.get(r)?.(i)??i).normalize("NFC");return`${l}${u}${c}`}}
