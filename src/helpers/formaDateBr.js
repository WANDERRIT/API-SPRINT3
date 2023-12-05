export default function(date){
// date = new Date;
return new Intl.DateTimeFormat("pt-BR",{
    timeZone: "UTC",
}).format(date);
}