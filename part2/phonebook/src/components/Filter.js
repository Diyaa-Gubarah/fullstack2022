function Filter({ filterPersons }) {
  return (
    <>
      <div>
        filter shown with: <input onChange={filterPersons} />
      </div>
      <br />
    </>
  );
}

export default Filter;
