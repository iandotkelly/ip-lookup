import { ipGetHandler } from '../src/get-handler'

describe('ipGetHandler', () => {
  it('should render the default view', () => {
    const res = {
      render: jest.fn(),
    }
    ipGetHandler({}, res)
    expect(res.render).toBeCalledWith('index', {})
  })
})
