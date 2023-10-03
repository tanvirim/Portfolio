const Hobbies = () => {
  const hobbiesData = ['Coding', 'Reading', 'Hiking', 'Photography'];

  return (
    <>
      <h2 className='text-2xl font-semibold mb-4'>Hobbies</h2>
      <ul className='list-disc pl-4'>
        {hobbiesData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Hobbies;
