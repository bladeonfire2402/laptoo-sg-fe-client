import {styled} from 'styled-components';

export const ProductDetailWrapper = styled.div`
  gap: 20px;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #F7F7FA;
`;

export const ProductDetailContent = styled.div`
 gap: 20px;
 width: 100%;
 display: flex;
 max-width: 1200px;
`;

export const OtherProductSection = styled.div`
 border-radius: 10px;
 background-color: white;
`;

export const HeadlineProduct = styled.div`
 gap: 10px;
 width: 100%;
 display: flex;
 max-width: 1200px;
 align-items: center;
`


export const ProductContent = styled.section`
  gap:25px;
  width: 100%;
  display: flex;
  padding: 30px 30px;
  height: max-content;
  border-radius: 10px;
  background-color: white;

  span {
    font-size: 14px;
  }
`;

export const DetailSection = styled.section`
 gap: 10px;
 display: flex;
 padding: 10px 20px;
 border-radius: 10px;
 justify-content: center;
 flex-direction: column;
 background-color: white;
`;

export const ShopSection = styled.section`
 gap: 10px;
 display: flex;
 padding: 10px 20px;
 border-radius: 10px;
 align-items: center;
 background-color: white;
`;

export const WarrantySection = styled.section``;

export const SubDetailSection =styled.section``;

export const VariantSelection = styled.div`
 gap: 10px;
 display: flex;
 flex-wrap: wrap;
 margin-top: 10px;
 max-width: 250px;
 margin-bottom: 10px;
 align-items: center;
`;
