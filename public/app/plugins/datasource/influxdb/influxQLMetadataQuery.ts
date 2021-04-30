import { InfluxQueryTag } from './types';
import InfluxDatasource from './datasource';
import { InfluxQueryBuilder } from './query_builder';

const runExploreQuery = async (
  type: string,
  withKey: string | undefined,
  target: { measurement: string | undefined; tags: InfluxQueryTag[]; policy: string | undefined },
  datasource: InfluxDatasource
): Promise<Array<{ text: string }>> => {
  const builder = new InfluxQueryBuilder(target, datasource.database);
  const q = builder.buildExploreQuery(type, withKey);
  return await datasource.metricFindQuery(q);
};

export async function getAllPolicies(datasource: InfluxDatasource): Promise<string[]> {
  const target = { tags: [], measurement: undefined, policy: undefined };
  const data = await runExploreQuery('RETENTION POLICIES', undefined, target, datasource);
  return data.map((item) => item.text);
}

export async function getAllMeasurements(datasource: InfluxDatasource): Promise<string[]> {
  const target = { tags: [], measurement: undefined, policy: undefined };
  const data = await runExploreQuery('MEASUREMENTS', undefined, target, datasource);
  return data.map((item) => item.text);
}

export async function getTagKeysForMeasurementAndTags(
  measurement: string | undefined,
  policy: string | undefined,
  tags: InfluxQueryTag[],
  datasource: InfluxDatasource
): Promise<string[]> {
  const target = { tags, measurement, policy };
  const data = await runExploreQuery('TAG_KEYS', undefined, target, datasource);
  return data.map((item) => item.text);
}

export async function getTagValues(
  tagKey: string,
  measurement: string | undefined,
  policy: string | undefined,
  datasource: InfluxDatasource
): Promise<string[]> {
  const target = { tags: [], measurement, policy };
  const data = await runExploreQuery('TAG_VALUES', tagKey, target, datasource);
  return data.map((item) => item.text);
}

export async function getFieldKeysForMeasurement(
  measurement: string,
  policy: string | undefined,
  datasource: InfluxDatasource
): Promise<string[]> {
  const target = { tags: [], measurement, policy };
  const data = await runExploreQuery('FIELDS', undefined, target, datasource);
  return data.map((item) => item.text);
}
