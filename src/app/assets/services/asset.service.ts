/**
 * Created by pepijn.bakker on 12-2-2016.
 */
import {Injectable} from 'angular2/core';
import {ASSETLIST} from './mock-assets';
import {Asset} from '../interfaces/asset';
import {Log} from '../../helpers/logging';

@Injectable()
export class AssetService {

  constructor(private _logger: Log) {
    _logger.info('AssetService constructor');
  }

  getAssets() {
    // Use Promise for async behaviour (as REST calling might take long time).
    return Promise.resolve(ASSETLIST);
  }

  getAssetsSlowly() {
    return new Promise<Asset[]>(resolve =>
      setTimeout(() => resolve(ASSETLIST), 2000) // 2 seconds
    );
  }

  getAsset(id: number) {
    return Promise.resolve(ASSETLIST).then(
      assets => assets.filter(asset => asset.id === id)[0]
    );
  }
}
