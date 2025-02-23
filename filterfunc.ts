interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}


interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}


export type Person = User | Admin;


export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];


export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}


export function filterPersons(persons: Person[], personType: string, criteria: Partial<Omit< User, "type">> | Partial<Omit< Admin, "type">>): Person[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === (criteria as any)[fieldName];
            });
        });
}


export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });
export const usersOfOccupationBall = filterPersons(persons, 'user', { occupation: "Ball" });
export const adminsOfRoleAdministrator = filterPersons(persons, 'admin', { role: "Administrator" });
export const usersOfNameAdmin = filterPersons(persons, 'users', { name: "Max Mustermann" });
export const adminsOfNameAdmin = filterPersons(persons, 'admin', { name: "Jane Doe" });

// This won't work cause "type" is omitted 
// export const adminsOfTypeAdmin = filterPersons(persons, 'admin', { type: "admin" });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);


console.log('Users of Occupation Ball:');
usersOfOccupationBall.forEach(logPerson);


console.log('Users of Name __:');
usersOfNameAdmin.forEach(logPerson);

console.log();


console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);

console.log('Admins of role administrator:');
adminsOfRoleAdministrator.forEach(logPerson);

console.log('Admins of name __:');
adminsOfNameAdmin.forEach(logPerson);

console.log();