import { render, screen } from '@testing-library/react';
import Ship, { ShipProps, View } from './index';

describe('Ship Item', () => {
  const mockShipData = {
    id: 'GOMSTREE',
    image: 'https://i.imgur.com/MtEgYbY.jpg',
    name: 'GO Ms Tree',
    type: 'High Speed Craft'
  };
  const renderShip = ({
    data = mockShipData,
    view = View.GALLERY
  }: Partial<ShipProps> = {}) => render(<Ship data={data} view={view} />);

  it('should render correctly default', () => {
    const { flexDirection, borderBottom, width } = {
      flexDirection: 'column',
      borderBottom: '1px solid',
      width: '240'
    };
    renderShip();

    const shipCover = screen.getByRole('img');
    expect(shipCover).toHaveAttribute('src', mockShipData.image);
    expect(shipCover).toHaveAttribute('alt', mockShipData.name);
    expect(shipCover).toHaveAttribute('width', width);
    expect(screen.getByTestId('ShipContainer')).toHaveStyle({
      'flex-direction': flexDirection,
      'border-bottom': borderBottom
    });
    expect(screen.getByText(mockShipData.name)).toBeInTheDocument();
    expect(screen.getByText(mockShipData.type)).toBeInTheDocument();
  });

  it('should render as a list item with correct attributes', () => {
    const { flexDirection, borderBottom, width } = {
      flexDirection: 'row',
      borderBottom: undefined,
      width: '360'
    };
    renderShip({ view: View.LIST });

    expect(screen.getByRole('img')).toHaveAttribute('width', width);
    expect(screen.getByTestId('ShipContainer')).toHaveStyle({
      'flex-direction': flexDirection,
      'border-bottom': borderBottom
    });
  });
});
