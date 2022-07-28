function Persons({ persons,onClick }) {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id} className='list_item'>
          <div >
            <p style={{display:"inline"}}>
              {person.name} {person.number}
            </p>
            <button style={{ marginInline: 16 }} onClick={()=> onClick(person.id)}>delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Persons;
