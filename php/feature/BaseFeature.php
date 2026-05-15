<?php
declare(strict_types=1);

// Coinpaprika SDK base feature

class CoinpaprikaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CoinpaprikaContext $ctx, array $options): void {}
    public function PostConstruct(CoinpaprikaContext $ctx): void {}
    public function PostConstructEntity(CoinpaprikaContext $ctx): void {}
    public function SetData(CoinpaprikaContext $ctx): void {}
    public function GetData(CoinpaprikaContext $ctx): void {}
    public function GetMatch(CoinpaprikaContext $ctx): void {}
    public function SetMatch(CoinpaprikaContext $ctx): void {}
    public function PrePoint(CoinpaprikaContext $ctx): void {}
    public function PreSpec(CoinpaprikaContext $ctx): void {}
    public function PreRequest(CoinpaprikaContext $ctx): void {}
    public function PreResponse(CoinpaprikaContext $ctx): void {}
    public function PreResult(CoinpaprikaContext $ctx): void {}
    public function PreDone(CoinpaprikaContext $ctx): void {}
    public function PreUnexpected(CoinpaprikaContext $ctx): void {}
}
