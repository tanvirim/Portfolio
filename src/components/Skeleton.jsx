
import { Skeleton, Grid, GridItem } from '@chakra-ui/react';

function SkeletonLoader() {
    return (
      <Grid templateColumns="repeat(7, 1fr)" gap="5px" width="20%">
        {Array.from({ length: 98 }, (_, index) => (
          <GridItem key={index} width="40px" height="40px">
            <Skeleton height="100%" width="100%" startColor="#7e7979" endColor="#f0f0f0" />
          </GridItem>
        ))}
      </Grid>
    );
  }
  
  export default SkeletonLoader;
  