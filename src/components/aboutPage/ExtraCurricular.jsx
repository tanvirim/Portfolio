const ExtracurricularActivities = () => {
  const activitiesData = [
    'RUET Debating Club - Member',
    'Proggramming Club - Member',
    'Sports Club - Member',
    'Cultural  Society - Member',
  ];

  return (
    <>
      <h2 className='text-2xl font-semibold mb-4'>
        Extracurricular Activities
      </h2>
      <ul className='list-disc pl-4'>
        {activitiesData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default ExtracurricularActivities;
