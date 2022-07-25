function PersonForm({ onSubmit, info, onChangeName, onChangeNumber }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={info.name} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={info.number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
