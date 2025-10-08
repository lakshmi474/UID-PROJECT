import React, { useEffect, useState } from 'react';

const empty = {
  name: '',
  dob: '',
  gender: 'Male',
  latestHeightCm: '',
  latestWeightKg: '',
  latestHeadCircumferenceCm: '',
  measurements: [],
  vaccinations: []
};

export default function InfantForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initial) {
      setForm({
        ...empty,
        ...initial,
        dob: initial.dob ? new Date(initial.dob).toISOString().slice(0, 10) : ''
      });
    } else {
      setForm(empty);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      dob: form.dob ? new Date(form.dob) : null,
      latestHeightCm: form.latestHeightCm ? Number(form.latestHeightCm) : undefined,
      latestWeightKg: form.latestWeightKg ? Number(form.latestWeightKg) : undefined,
      latestHeadCircumferenceCm: form.latestHeadCircumferenceCm ? Number(form.latestHeadCircumferenceCm) : undefined
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-2">
        <label className="form-label">Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Date of Birth</label>
        <input type="date" className="form-control" name="dob" value={form.dob} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Gender</label>
        <select className="form-select" name="gender" value={form.gender} onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div className="row g-2 mb-2">
        <div className="col">
          <label className="form-label">Height (cm)</label>
          <input className="form-control" name="latestHeightCm" value={form.latestHeightCm} onChange={handleChange} />
        </div>
        <div className="col">
          <label className="form-label">Weight (kg)</label>
          <input className="form-control" name="latestWeightKg" value={form.latestWeightKg} onChange={handleChange} />
        </div>
        <div className="col">
          <label className="form-label">Head Circ (cm)</label>
          <input className="form-control" name="latestHeadCircumferenceCm" value={form.latestHeadCircumferenceCm} onChange={handleChange} />
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">{initial ? 'Update' : 'Add'}</button>
        {initial && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
