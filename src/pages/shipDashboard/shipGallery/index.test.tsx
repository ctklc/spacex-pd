import { fireEvent, render, screen } from '@testing-library/react';
import ShipGallery, { ShipGalleryProps } from './index';
import { View } from '../ship';

const mockShipData = [
  {
    id: 'GOMSTREE',
    image: 'https://i.imgur.com/MtEgYbY.jpg',
    name: 'GO Ms Tree',
    type: 'High Speed Craft'
  },
  {
    id: 'GOPURSUIT',
    image: 'https://i.imgur.com/5w1ZWre.jpg',
    name: 'GO Pursuit',
    type: 'Cargo'
  },
  {
    id: 'AMERICANCHAMPION',
    image: 'https://i.imgur.com/woCxpkj.jpg',
    name: 'American Champion',
    type: 'Tug'
  }
];

describe('Ship List View', () => {
  const renderShipGallery = ({
    data,
    loading,
    view = View.GALLERY,
    onLoadMore = () => {}
  }: Partial<ShipGalleryProps> = {}) =>
    render(
      <ShipGallery
        data={data}
        loading={loading}
        view={view}
        onLoadMore={onLoadMore}
      />
    );

  it('should show loading when fetching data', () => {
    renderShipGallery({ loading: true });

    expect(screen.getByTestId('ShipGallerySpinner')).toBeInTheDocument();
    expect(screen.queryByTestId('ShipContainer')).not.toBeInTheDocument();
  });

  it('should render the ship items when data exist', () => {
    renderShipGallery({ data: mockShipData });

    expect(screen.queryByTestId('ShipGallerySpinner')).not.toBeInTheDocument();
    const shipItems = screen.getAllByTestId('ShipContainer');
    expect(shipItems).toHaveLength(mockShipData.length);
  });

  it('should have correct styles when view mode is gallery', () => {
    renderShipGallery({ data: mockShipData });

    expect(screen.getByTestId('ShipGalleryContainer')).toHaveStyle({
      'flex-direction': 'row'
    });
  });

  it('should have correct styles when view mode is list', () => {
    renderShipGallery({ data: mockShipData, view: View.LIST });

    expect(screen.getByTestId('ShipGalleryContainer')).toHaveStyle({
      'flex-direction': 'column'
    });
  });

  it('should have more data and load more when scrolled in the document', () => {
    const handleScroll = jest.fn();
    renderShipGallery({
      data: mockShipData,
      view: View.LIST,
      onLoadMore: handleScroll
    });

    fireEvent.scroll(document, {
      target: {
        scrollingElement: {
          scrollTop: 1,
          clientHeight: 1,
          scrollHeight: 1
        }
      }
    });

    expect(handleScroll).toHaveBeenCalled();
    expect(handleScroll).toHaveBeenCalledWith(mockShipData.length);
  });
});
