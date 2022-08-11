import "./Input.css";

function Input({ label, value, onChange, type, ...options }) {
  return (
    <>
      <label>{label}</label>
      <input {...options} type={type} value={value} onChange={onChange} className="FormInput"/>
    </>
  );
}

export default Input;
