<?php
declare(strict_types=1);

// Coinpaprika SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CoinpaprikaUtility::setRegistrar(function (CoinpaprikaUtility $u): void {
    $u->clean = [CoinpaprikaClean::class, 'call'];
    $u->done = [CoinpaprikaDone::class, 'call'];
    $u->make_error = [CoinpaprikaMakeError::class, 'call'];
    $u->feature_add = [CoinpaprikaFeatureAdd::class, 'call'];
    $u->feature_hook = [CoinpaprikaFeatureHook::class, 'call'];
    $u->feature_init = [CoinpaprikaFeatureInit::class, 'call'];
    $u->fetcher = [CoinpaprikaFetcher::class, 'call'];
    $u->make_fetch_def = [CoinpaprikaMakeFetchDef::class, 'call'];
    $u->make_context = [CoinpaprikaMakeContext::class, 'call'];
    $u->make_options = [CoinpaprikaMakeOptions::class, 'call'];
    $u->make_request = [CoinpaprikaMakeRequest::class, 'call'];
    $u->make_response = [CoinpaprikaMakeResponse::class, 'call'];
    $u->make_result = [CoinpaprikaMakeResult::class, 'call'];
    $u->make_point = [CoinpaprikaMakePoint::class, 'call'];
    $u->make_spec = [CoinpaprikaMakeSpec::class, 'call'];
    $u->make_url = [CoinpaprikaMakeUrl::class, 'call'];
    $u->param = [CoinpaprikaParam::class, 'call'];
    $u->prepare_auth = [CoinpaprikaPrepareAuth::class, 'call'];
    $u->prepare_body = [CoinpaprikaPrepareBody::class, 'call'];
    $u->prepare_headers = [CoinpaprikaPrepareHeaders::class, 'call'];
    $u->prepare_method = [CoinpaprikaPrepareMethod::class, 'call'];
    $u->prepare_params = [CoinpaprikaPrepareParams::class, 'call'];
    $u->prepare_path = [CoinpaprikaPreparePath::class, 'call'];
    $u->prepare_query = [CoinpaprikaPrepareQuery::class, 'call'];
    $u->result_basic = [CoinpaprikaResultBasic::class, 'call'];
    $u->result_body = [CoinpaprikaResultBody::class, 'call'];
    $u->result_headers = [CoinpaprikaResultHeaders::class, 'call'];
    $u->transform_request = [CoinpaprikaTransformRequest::class, 'call'];
    $u->transform_response = [CoinpaprikaTransformResponse::class, 'call'];
});
